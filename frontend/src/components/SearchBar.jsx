import './SearchBar.css';

export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search">
      <label htmlFor="search-input" className="search__label">
        Search
      </label>
      <input
        id="search-input"
        type="search"
        className="search__input"
        placeholder="Busca por marca, modelo..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {typeof resultCount === 'number' && (
        <span className="search__count">{resultCount} results</span>
      )}
    </div>
  );
}
