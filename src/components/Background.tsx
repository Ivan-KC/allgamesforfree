import { useEffect, useRef, useState } from "react";
import "../styles/layout/background.css";

import bg1 from "../assets/background/bg-prop-1.png";
import bg2 from "../assets/background/bg-prop-2.png";
import bg3 from "../assets/background/bg-prop-3.png";
import bg4 from "../assets/background/bg-prop-4.png";
import bg5 from "../assets/background/bg-prop-5.png";
import bg6 from "../assets/background/bg-prop-6.png";
import bg7 from "../assets/background/bg-prop-7.png";
import bg8 from "../assets/background/bg-prop-8.png";
import bg9 from "../assets/background/bg-prop-9.png";
import bg10 from "../assets/background/bg-prop-10.png";
import bg11 from "../assets/background/bg-prop-11.png";
import bg12 from "../assets/background/bg-prop-12.png";
import bg13 from "../assets/background/bg-prop-13.png";
import bg14 from "../assets/background/bg-prop-14.png";
import bg15 from "../assets/background/bg-prop-15.png";
import bg16 from "../assets/background/bg-prop-16.png";

const images = [
  bg1, bg2, bg3, bg4,
  bg5, bg6, bg7, bg8,
  bg9, bg10, bg11, bg12,
  bg13, bg14, bg15, bg16
];

type Item = {
  id: number;
  image: string;
  style: React.CSSProperties;
  state: "enter" | "visible" | "exit";
};

// Cantidad de imagenes según pantalla
const getItemCount = () => {
  const w = window.innerWidth;
  if (w < 500) return 4;
  if (w < 900) return 6;
  return 8;
};

// Posiciones distribuidas
const randomPos = () => ({
  top: `${10 + Math.random() * 80}%`,
  left: `${10 + Math.random() * 80}%`,
  width: `${4 + Math.random() * 6}rem`
});

export default function Background() {
  const [items, setItems] = useState<Item[]>([]);

  // Imágenes disponibles que no están en pantalla
  const availableRef = useRef<string[]>([]);

  const idRef = useRef(0);

  const getId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  useEffect(() => {
    const count = getItemCount();

    const shuffled = [...images].sort(() => Math.random() - 0.5);

    const initial = shuffled.slice(0, count);

    availableRef.current = shuffled.slice(count);

    setItems(
      initial.map((img) => ({
        id: getId(),
        image: img,
        state: "enter",
        style: {
          ...randomPos(),
          animationDuration: `${40 + Math.random() * 40}s`
        }
      }))
    );

    // Activar fade-in después de crear
    setTimeout(() => {
      setItems(prev =>
        prev.map(item => ({ ...item, state: "visible" }))
      );
    }, 50);

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        if (availableRef.current.length === 0) return prev;

        const index = Math.floor(Math.random() * prev.length);

        const updated = [...prev];

        // Marcar como exit
        updated[index] = {
          ...updated[index],
          state: "exit"
        };

        // Después del fade, reemplazar
        setTimeout(() => {
          setItems(current => {
            if (!current[index]) return current;

            const copy = [...current];

            const nextImage = availableRef.current.shift()!;
            availableRef.current.push(copy[index].image);

            copy[index] = {
              id: getId(),
              image: nextImage,
              state: "enter",
              style: {
                ...randomPos(),
                animationDuration: `${40 + Math.random() * 40}s`
              }
            };

            // Fade-in
            setTimeout(() => {
              setItems(latest =>
                latest.map((it, i) =>
                  i === index ? { ...it, state: "visible" } : it
                )
              );
            }, 50);

            return copy;
          });
        }, 2000); // Duración del fade-out

        return updated;
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="floating-bg">
        {items.map(item => (
          <div
            className="float-wrapper"
            style={item.style}
          >
            <img
              src={item.image}
              className={`float-item ${item.state}`}
            />
          </div>
        ))}
      </div>

      <div className="floating-overlay" />
    </>
  );
}