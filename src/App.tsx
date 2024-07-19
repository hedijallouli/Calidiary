import React, { useState, useEffect, useRef } from "react";
import { DiaryEntry } from "./types";
import DiaryEntryCard from "./DiaryEntryCard";
import DiaryEntryList from "./DiaryEntryList";
import "./App.css";

const diaryData: DiaryEntry[] = [
  {
    date: "2024-06-25",
    title: "Deploying My First Full-Stack Project",
    content:
      "Today was a monumental day as I finally deployed my first full-stack project. After months of development, testing, and debugging, I pushed the code to the live server. The application is running smoothly, and seeing it live is incredibly satisfying. This project has been a significant learning experience, and I feel more confident in my skills as a full-stack developer. I look forward to gathering user feedback and continuously improving the application.",
    tags: ["full-stack", "deployment", "project", "achievement", "learning"],
  },
  {
    date: "2024-06-24",
    title: "Solving a Complex Bug",
    content:
      "Yesterday was challenging but rewarding. I spent hours troubleshooting a complex bug that was causing data inconsistencies in the application. After extensive debugging and researching online forums, I finally identified the root cause and implemented a fix. The sense of relief and accomplishment was immense. This experience taught me the importance of persistence and thorough testing.",
    tags: ["debugging", "problem-solving", "coding", "achievement", "learning"],
  },
  {
    date: "2024-06-23",
    title: "Learning a New Framework",
    content:
      "Today was all about learning. I decided to dive into a new JavaScript framework that I've been hearing a lot about. The documentation was extensive, but I managed to build a small project by the end of the day. It's exciting to see how different frameworks can enhance productivity and offer new perspectives on problem-solving. I'm eager to integrate this new knowledge into my upcoming projects.",
    tags: ["learning", "JavaScript", "framework", "development", "coding"],
  },
  {
    date: "2024-06-22",
    title: "Collaborating with the Design Team",
    content:
      "Today was a great day for collaboration. I spent the afternoon working closely with the design team to refine the user interface of our application. We brainstormed ideas and implemented some key changes that significantly improved the user experience. It's amazing how much can be achieved when developers and designers work together. I'm looking forward to seeing how users respond to the new design.",
    tags: ["collaboration", "design", "UI/UX", "teamwork", "development"],
  },
  {
    date: "2024-06-21",
    title: "Overcoming Impostor Syndrome",
    content:
      "Today was a bit tough as I struggled with impostor syndrome. Despite my achievements, I sometimes feel like I'm not good enough. I talked to a mentor about these feelings, and they reminded me of how far I've come and the importance of self-compassion. It's a journey, and it's okay to have doubts. I'm going to focus on celebrating small victories and continue to learn and grow.",
    tags: ["impostor syndrome", "self-doubt", "growth", "mental health", "learning"],
  },
  {
    date: "2024-06-20",
    title: "Attending a Tech Conference",
    content:
      "Today I returned from an inspiring tech conference. The event was filled with insightful talks, hands-on workshops, and networking opportunities. I learned about the latest trends in web development, met some industry leaders, and connected with fellow developers. The highlight was a keynote speech about the future of full-stack development, which left me feeling motivated and excited about my career path. I can't wait to apply what I've learned to my work.",
    tags: ["tech conference", "networking", "inspiration", "learning", "development"],
  },
];


const allTags = Array.from(new Set(diaryData.flatMap((entry) => entry.tags))).map((tag) => ({
  value: tag,
  label: tag,
}));

const createOption = (label: string) => ({
  label,
  value: label,
});

function App() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const todaysMonth = String(month).padStart(2, "0");
  const todaysDate = String(date).padStart(2, "0");
  const currentDate = `${year}-${todaysMonth}-${todaysDate}`;

  const [diary, setDiary] = useState<DiaryEntry[]>(diaryData);
  const [dayDate, setDayDate] = useState<string>(currentDate);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  const [filterTags, setFilterTags] = useState<{ value: string; label: string }[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isEntryCardVisible, setIsEntryCardVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const entry = diary.find((entry) => entry.date === dayDate);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setTags(entry.tags.map((tag) => createOption(tag)));
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [entry]);

  const handleNext = (): void => {
    if (dayDate === currentDate) return;
    const current = new Date(dayDate);
    const next = new Date(current.setDate(current.getDate() + 1));
    const nextMonth = String(next.getMonth() + 1).padStart(2, "0");
    const nextDate = String(next.getDate()).padStart(2, "0");
    const nextDateYear = next.getFullYear();
    const nextEntry = `${nextDateYear}-${nextMonth}-${nextDate}`;
    setDayDate(nextEntry);
  };

  const handlePrevious = (): void => {
    const current = new Date(dayDate);
    const previous = new Date(current.setDate(current.getDate() - 1));
    const previousMonth = String(previous.getMonth() + 1).padStart(2, "0");
    const previousDate = String(previous.getDate()).padStart(2, "0");
    const previousDateYear = previous.getFullYear();
    const previousEntry = `${previousDateYear}-${previousMonth}-${previousDate}`;
    setDayDate(previousEntry);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setTitle(e.target.value);
    if (!entry) {
      createNewEntry(e.target.value, content, tags.map((tag) => tag.value));
    } else {
      updateDiaryEntry(e.target.value, content, tags.map((tag) => tag.value));
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setContent(e.target.value);
    updateDiaryEntry(title, e.target.value, tags.map((tag) => tag.value));
  };

  const handleTagsChange = (selectedOptions: any) => {
    const newTags = selectedOptions.map((option: any) => option.value);
    setTags(selectedOptions);
    updateDiaryEntry(title, content, newTags);
  };

  const handleCreateTag = (inputValue: string) => {
    const newOption = createOption(inputValue);
    setTags((prevTags) => [...prevTags, newOption]);
    updateDiaryEntry(title, content, [...tags.map((tag) => tag.value), inputValue]);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      const selectedDate = `${year}-${month}-${day}`;
      setDayDate(selectedDate);
    }
    setIsDatePickerOpen(false);
  };

  const handleFilterTagsChange = (selectedOptions: any) => {
    setFilterTags(selectedOptions);
  };

  const createNewEntry = (newTitle: string, newContent: string, newTags: string[]): void => {
    const newEntry: DiaryEntry = {
      date: dayDate,
      title: newTitle,
      content: newContent,
      tags: newTags,
    };
    setDiary((prevDiary) => [...prevDiary, newEntry]);
  };

  const updateDiaryEntry = (newTitle: string, newContent: string, newTags: string[]): void => {
    setDiary((prevDiary) =>
      prevDiary.map((entry) =>
        entry.date === dayDate
          ? { ...entry, title: newTitle, content: newContent, tags: newTags }
          : entry
      )
    );
  };

  const deleteDiaryEntry = (date: string): void => {
    setDiary((prevDiary) => prevDiary.filter((entry) => entry.date !== date));
    if (date === dayDate) {
      setDayDate(currentDate);
      setIsEntryCardVisible(false);
    }
  };

  const filteredDiaryEntries = diary
    .filter((entry) =>
      filterTags.length > 0
        ? filterTags.every((filterTag) => entry.tags.includes(filterTag.value))
        : true
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleAddButtonClick = (): void => {
    setDayDate(currentDate);
    if (!diary.some((entry) => entry.date === currentDate)) {
      setIsDatePickerOpen(true);
    }
    setIsEntryCardVisible(true);
  };

  const handleEntryClick = (date: string): void => {
    setDayDate(date);
    setIsEntryCardVisible(true);
    setIsDatePickerOpen(false);
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <div className="HeaderWrapper">
        <div className="HeaderBar">
          <a href="/en" aria-current="page" className="active">
            
            <h2>Mydiary</h2>
          </a>
          
        </div>

        <div className="main">
          <DiaryEntryList
            entries={filteredDiaryEntries}
            filterTags={filterTags}
            allTags={allTags}
            onFilterTagsChange={handleFilterTagsChange}
            onEntryClick={handleEntryClick}
            onAddButtonClick={handleAddButtonClick}
            onDeleteEntry={deleteDiaryEntry}
          />

          <DiaryEntryCard
            dayDate={dayDate}
            currentDate={currentDate}
            title={title}
            content={content}
            tags={tags}
            allTags={allTags}
            isDatePickerOpen={isDatePickerOpen}
            isEntryCardVisible={isEntryCardVisible}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onTagsChange={handleTagsChange}
            onCreateTag={handleCreateTag}
            onDateChange={handleDateChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            toggleDatePicker={() => setIsDatePickerOpen(!isDatePickerOpen)}
            ref={cardRef}
          />
        </div>

        <div className="FooterWrapper">
          <div className="Footer">
            <p>copyrights Hedi Jallouli</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
