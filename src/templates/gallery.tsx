import { CardData } from "../types";
import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const GalleryTemplate: FC<{
  data: CardData[];
  currentPage: number;
  totalPages: number;
}> = ({ data, currentPage, totalPages }) => {
  const gallery = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  `;
  const imageCard = css`
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  `;
  const imageContainer = css`
    height: 250px;
    overflow: hidden;
    position: relative;
  `;
  const image = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  `;
  const cardContent = css`
    padding: 20px;
  `;
  const parameters = css`
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 10px;
    margin-top: 15px;
  `;
  const parameter = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  `;
  const parameterName = css`
    font-weight: bold;
  `;
  const pagination = css`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 30px 0;
  `;

  const pageButton = css`
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f0f0f0;
    }
    &:disabled {
      background-color: #eee;
      cursor: not-allowed;
    }
  `;

  const activePage = css`
    background-color: #007bff;
    color: white;
    border-color: #007bff;
    &:hover {
      background-color: #0056b3;
    }
  `;

  return (
    <>
      <Style />
      <div class={gallery}>
        {data.map(async (d) => {
          return (
            <div class={imageCard}>
              <div class={imageContainer}>
                <img
                  src={d.imageUrl}
                  alt={`Goose ${d.activity}`}
                  class={image}
                />
              </div>
              <div class={cardContent}>
                <div class={parameters}>
                  <div class={parameter}>
                    <span class={parameterName}>Activity:</span>
                    <span>{d.activity}</span>
                  </div>
                  <div class={parameter}>
                    <span class={parameterName}>Color Scheme:</span>
                    <span style="text-align:right;">{d.color}</span>
                  </div>
                  <div class={parameter}>
                    <span class={parameterName}>Art Style:</span>
                    <span>{d.artStyle}</span>
                  </div>
                  <div class={parameter}>
                    <span class={parameterName}>Creator:</span>
                    <span>{d.username}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div class={pagination}>
        <a
          href={`/?page=${currentPage - 1}`}
          class={pageButton}
          style={{
            pointerEvents: currentPage <= 1 ? "none" : "auto",
            opacity: currentPage <= 1 ? "0.5" : "1",
          }}
        >
          Previous
        </a>
        <a
          href={`/?page=${currentPage + 1}`}
          class={pageButton}
          style={{
            pointerEvents: currentPage >= totalPages ? "none" : "auto",
            opacity: currentPage >= totalPages ? "0.5" : "1",
          }}
        >
          Next
        </a>
      </div>
    </>
  );
};

export default GalleryTemplate;
