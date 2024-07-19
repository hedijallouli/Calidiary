import React, { forwardRef } from "react";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DiaryEntryCardProps {
  dayDate: string;
  currentDate: string;
  title: string;
  content: string;
  tags: { value: string; label: string }[];
  allTags: { value: string; label: string }[];
  isDatePickerOpen: boolean;
  isEntryCardVisible: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTagsChange: (selectedOptions: any) => void;
  onCreateTag: (inputValue: string) => void;
  onDateChange: (date: Date | null) => void;
  onNext: () => void;
  onPrevious: () => void;
  toggleDatePicker: () => void;
}

const DiaryEntryCard = forwardRef<HTMLDivElement, DiaryEntryCardProps>(({
  dayDate,
  currentDate,
  title,
  content,
  tags,
  allTags,
  isDatePickerOpen,
  isEntryCardVisible,
  onTitleChange,
  onContentChange,
  onTagsChange,
  onCreateTag,
  onDateChange,
  onNext,
  onPrevious,
  toggleDatePicker
}, ref) => {
  if (!isEntryCardVisible) return null;

  return (
    <div className="entry-card" ref={ref}>
      <div className="card-header">
        <div className="previous">
          <button onClick={onPrevious} className="link-button">What happened yesterday?</button>
        </div>
        <h2 onClick={toggleDatePicker}>{dayDate}</h2>
        <div className="next">
          <button onClick={onNext} className={`link-button ${dayDate === currentDate ? "disabled" : ""}`}>
            What about tomorrow?
          </button>
        </div>
      </div>

      {isDatePickerOpen && (
        <DatePicker
          selected={new Date(dayDate)}
          onChange={onDateChange}
          inline
          maxDate={new Date()}
        />
      )}

      <div className="card-content">
        <div className="diary">
          <label className="label">What title do you want to give to this day?</label>
          <textarea
            className="title"
            value={title}
            onChange={onTitleChange}
            placeholder="Title"
          ></textarea>
          <label className="label">Add some tags</label>
          <CreatableSelect
            className="tags"
            isMulti
            value={tags}
            onChange={onTagsChange}
            options={allTags}
            onCreateOption={onCreateTag}
            components={{ DropdownIndicator: null }}
            placeholder="Tags"
          />
          <label className="label">Write about your day...</label>
          <textarea
            className="content"
            value={content}
            onChange={onContentChange}
            placeholder="Content"
          ></textarea>
        </div>
      </div>
    </div>
  );
});

export default DiaryEntryCard;
