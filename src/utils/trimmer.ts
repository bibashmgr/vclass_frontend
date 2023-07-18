export const filenameTrimmer = (name: string, chars: number, subst: string) => {
  return name.replace(
    new RegExp('(^.{' + chars + '}).+(\\.[^\\.]*$)'),
    '$1' + subst + '$2'
  );
};

export const numberTrimmer = (num: number) => {
  if(num < 10){
    return `0${num}`;
  } else {
    return num;
  }
};
