export default function Header(props) {
  return (
    <section className="company-home-search-section">
      <div className="company-home-search-section-inner">
        <div className="company-home-search-text">
          <p className="company-home-search-text-head">
            Are you searching for projects to showcase your expertise?
          </p>
          <p className="company-home-search-text-des">
            At Clientsbridge, we connect your company with clients seeking
            skilled professionals. Explore over 10,000 client projects and find
            the perfect opportunities to grow your business.
          </p>
        </div>
        <div className="company-home-search-section-search-container">
          <input
            placeholder="Search Jobs"
            type="search"
            className="company-home-search-input"
            value={props.searchTerm}
            onChange={(e) => props.setSearchTerm(e.target.value)}
          />
          <p className="company-home-search-btn">Search</p>
        </div>
      </div>
    </section>
  );
}
