function Home() {
  return (
    <main className="landing-page">
      <section className="landing-copy">
        <p className="eyebrow">A little something for every craving</p>
        <h1>Good food<br /><em>starts here.</em></h1>
        <p className="landing-lede">Discover recipes worth sharing, save the ones you love, and make your kitchen feel like home.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/recipes">Explore recipes <span aria-hidden="true">-&gt;</span></a>
          <a className="text-link" href="/signup">Share your recipe <span aria-hidden="true">-&gt;</span></a>
        </div>
      </section>
      <section className="landing-feature" aria-label="Featured recipe">
        <div className="feature-image feature-image-hero" role="img" aria-label="Roasted tomatoes on toast" />
        <div className="feature-caption">
          <div><span className="caption-kicker">Recipe of the day</span><h2>Roasted tomato toast</h2></div>
          <span className="round-arrow" aria-hidden="true">-&gt;</span>
        </div>
      </section>
    </main>
  )
}

export default Home
