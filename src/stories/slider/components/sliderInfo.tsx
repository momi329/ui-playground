type SliderInfoProps = {
  minValue: number;
  maxValue: number;
  step: number;
  errMsg: string;
};

export function SliderInfo({
  minValue,
  maxValue,
  step,
  errMsg,
}: SliderInfoProps) {
  return (
    <div className="flex gap-2 flex-col items-center mb-4">
      <h1 className="text-2xl font-bold">Slider</h1>
      <p className="leading-10">
        你選到 min
        <span className="ml-1 text-primary-500 font-bold text-xl">
          {minValue}
        </span>
        {"  "}| 你選到 max
        <span className="ml-1 text-primary-500 font-bold text-xl">
          {maxValue}
        </span>
        {"  "}| Step
        <span className="ml-1 text-primary-500 font-bold text-xl">{step}</span>
      </p>
      {errMsg && <p className="text-red-500">{errMsg}</p>}
    </div>
  );
}
