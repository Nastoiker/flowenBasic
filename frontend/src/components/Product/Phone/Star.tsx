const Star = ({ rating }: { rating: number }) => {
  const filled = Math.round(rating * 2) / 2; // округляем до ближайшего 0.5
  const starWidth = 24; // ширина звезды
  const starHeight = 24; // высота звезды
  const starPoints =
    "12,1 15.09,8.09 23,9.36 17,14.64 18.18,22.55 12,18.18 5.82,22.55 7,14.64 1,9.36 8.91,8.09"; // координаты звезды

  const gradientStops = [
    { offset: "0%", color: "#3b424e" },
    { offset: "50%", color: "#3b424e" },
    { offset: "50%", color: "#ffffff" },
    { offset: "100%", color: "#FFFFFF" },
  ];

  if (filled < 3) {
    gradientStops[1].offset = `${filled * 33.33}%`;
  } else if (filled === 3) {
    gradientStops[1].offset = "33.33%";
    gradientStops[2].offset = "33.33%";
  } else if (filled < 4) {
    gradientStops[1].offset = "33.33%";
    gradientStops[2].offset = `${(filled - 3) * 33.33}%`;
  } else if (filled === 4) {
    gradientStops[1].offset = "33.33%";
    gradientStops[2].offset = "66.66%";
    gradientStops[3].offset = "66.66%";
  } else {
    gradientStops[1].offset = "33.33%";
    gradientStops[2].offset = "66.66%";
    gradientStops[3].offset = `${(filled - 4) * 33.33}%`;
  }
  const gradient = gradientStops.map((stop) => (
    <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
  ));

  return (
    <svg
      width={starWidth}
      height={starHeight}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          {gradient}
        </linearGradient>
      </defs>
      <polygon points={starPoints} fill="url(#starGradient)" />
    </svg>
  );
};

export default Star;
