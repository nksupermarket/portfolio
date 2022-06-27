type ReduceReturnType = {
  xMin: number | null;
  xMax: number | null;
  yMin: number | null;
  yMax: number | null;
};

export default function fitPathToSvg(svg: SVGElement) {
  const children = [...svg.children] as SVGGraphicsElement[];
  const { xMin, xMax, yMin, yMax } = children.reduce<ReduceReturnType>(
    (acc, el) => {
      const { x, y, width, height } = el.getBBox();

      if (!acc.xMin || x < acc.xMin) acc.xMin = x;
      if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
      if (!acc.yMin || y < acc.yMin) acc.yMin = y;
      if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;

      return acc;
    },
    { xMin: null, xMax: null, yMin: null, yMax: null }
  );

  svg.setAttribute('viewBox', `${xMin} ${yMin} ${xMax} ${yMax}`);
}
