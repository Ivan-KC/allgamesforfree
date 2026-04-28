import { useMemo } from "react";
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

export default function Background() {
    const rows = 4;
    const cols = 4;

    const items = useMemo(() => {
        const generated = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const i = row * cols + col;

                const baseTop = (row / rows) * 100;
                const baseLeft = (col / cols) * 100;

                // Posiciones con ruido                
                const offsetTop = (Math.random() - 0.5) * 10;
                const offsetLeft = (Math.random() - 0.5) * 10;

                generated.push({
                    id: i,
                    image: images[i % images.length],
                    style: {
                        top: `${baseTop + offsetTop}%`,
                        left: `${baseLeft + offsetLeft}%`,
                        animationDuration: `${25 + Math.random() * 10}s`,
                        width: `${5 + Math.random() * 10}rem`
                    }
                });
            }
        }

        return generated;
    }, []);

    return (
        <>
            <div className="floating-bg">
                {items.map(item => (
                    <img
                        key={item.id}
                        src={item.image}
                        className="float-item"
                        style={item.style}
                    />
                ))}
            </div>

            <div className="floating-overlay"></div>
        </>
    );
}