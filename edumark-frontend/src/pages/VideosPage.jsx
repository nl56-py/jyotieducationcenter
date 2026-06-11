import { useState } from "react";
import { PageHero } from "../components/PageHero.jsx";
import { assets } from "../data/assets.js";
import { videoItems } from "../data/testimonials.js";

export function VideosPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(videoItems.map((video) => video.category)))];
  const filtered = category === "All" ? videoItems : videoItems.filter((video) => video.category === category);

  return (
    <main>
      <PageHero
        eyebrow="Video Gallery"
        title="Watch student success stories and expert tips"
        text="A gallery-style page ready for office videos, reels, testimonials, destination guides, and preparation highlights."
        image={assets.success}
      />
      <section className="section">
        <div className="filter-row">
          {categories.map((item) => (
            <button type="button" key={item} className={item === category ? "filter-active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="video-grid">
          {filtered.map((video, index) => (
            <article className={index === 0 ? "video-card featured-video" : "video-card"} key={video.title}>
              {video.media === "video" ? (
                <video controls poster={video.poster}>
                  <source src="/videos/edumark-campus.mp4" type="video/mp4" />
                </video>
              ) : (
                <img src={video.image} alt={video.title} />
              )}
              <span>{video.category}</span>
              <h3>{video.title}</h3>
              <p>{video.duration ? `${video.duration} prepared slot for social video updates.` : "Featured local video from the available media library."}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
