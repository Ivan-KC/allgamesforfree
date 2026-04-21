import "../styles/background.css";

const images = [
    "/src/assets/background/bg-prop-1.png",
    "/src/assets/background/bg-prop-2.png",
    "/src/assets/background/bg-prop-3.png",
    "/src/assets/background/bg-prop-4.png",
    "/src/assets/background/bg-prop-5.png",
    "/src/assets/background/bg-prop-6.png",
    "/src/assets/background/bg-prop-7.png",
    "/src/assets/background/bg-prop-8.png",
    "/src/assets/background/bg-prop-9.png",
    "/src/assets/background/bg-prop-10.png",
    "/src/assets/background/bg-prop-11.png",
    "/src/assets/background/bg-prop-12.png",
    "/src/assets/background/bg-prop-13.png",
    "/src/assets/background/bg-prop-14.png",
    "/src/assets/background/bg-prop-15.png",
    "/src/assets/background/bg-prop-16.png",
];

export default function Background() {
    const rows = 4;
    const cols = 4;

    const items = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const i = row * cols + col;

            const baseTop = (row / rows) * 100;
            const baseLeft = (col / cols) * 100;

            // Posiciones con ruido
            const offsetTop = (Math.random() - 0.5) * 10;
            const offsetLeft = (Math.random() - 0.5) * 10;

            items.push({
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