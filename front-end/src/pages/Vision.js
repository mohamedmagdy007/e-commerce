import React from "react";

export default function Vision() {
  return (
    <div style={{ backgroundColor: "#eaded7", padding: "20px 0" }}>
      <div className="container">
        <div className="vision">
          <h2>
            Custom Furniture <br /> Built Only For You
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum debitis consectetur reprehenderit non aliquam voluptates
            dolore aut vero consequuntur.
          </p>
        </div>
        <div className="v-grid">
          <div className="card-vision">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-compass"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#7f5345"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="3" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="21" />
                <line x1="3" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="21" y2="12" />
              </svg>
            </span>
            <h3>Mission</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
          <div className="card-vision">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-diamond"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#7f5345"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 5h12l3 5l-8.5 9.5a0.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
                <path d="M10 12l-2 -2.2l.6 -1" />
              </svg>
            </span>
            <h3>Vision</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
          <div className="card-vision">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-book"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#7f5345"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                <line x1="3" y1="6" x2="3" y2="19" />
                <line x1="12" y1="6" x2="12" y2="19" />
                <line x1="21" y1="6" x2="21" y2="19" />
              </svg>
            </span>
            <h3>History</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum
              velit autem unde numquam nisi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
