import React from "react";
import Select from "react-select";
import { DiaryEntry } from "./types";

interface DiaryEntryListProps {
  entries: DiaryEntry[];
  filterTags: { value: string; label: string }[];
  allTags: { value: string; label: string }[];
  onFilterTagsChange: (selectedOptions: any) => void;
  onEntryClick: (date: string) => void;
  onAddButtonClick: () => void;
  onDeleteEntry: (date: string) => void;
}

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({
  entries,
  filterTags,
  allTags,
  onFilterTagsChange,
  onEntryClick,
  onAddButtonClick,
  onDeleteEntry,
}) => {
  return (
    <div className="list-of-entries">
      <h2>LIST OF ENTRIES</h2>
      <Select
        isMulti
        value={filterTags}
        onChange={onFilterTagsChange}
        options={allTags}
        className="tag-filter"
        placeholder="Filter by tags"
      />
      {entries.map((entry) => (
        <div key={entry.date} className="entry-block" onClick={() => onEntryClick(entry.date)}>
          <div className="entry-date">{entry.date}</div>
          <div className="entry-title">{entry.title}</div>
          <div className="entry-tags tags">
            {entry.tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
              </div>
            ))}
          </div>
          <button onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDeleteEntry(entry.date);
          }}>Delete</button>
        </div>
      ))}
      <div className="entry-block add-entry-block" onClick={onAddButtonClick}>
        <div className="add-button">+</div>
      </div>
    </div>
  );
};

export default DiaryEntryList;
