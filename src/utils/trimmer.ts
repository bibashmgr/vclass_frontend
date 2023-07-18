export const filenameTrimmer = (name: string, chars: number, subst: string) => {
  return name.replace(
    new RegExp('(^.{' + chars + '}).+(\\.[^\\.]*$)'),
    '$1' + subst + '$2'
  );
};
