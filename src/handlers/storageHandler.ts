// token
export const getToken = (): string | null => {
  return localStorage.getItem('VCLASS_TOKEN');
};

export const setToken = async (token: string) => {
  localStorage.setItem('VCLASS_TOKEN', token);
};

export const removeToken = () => {
  localStorage.removeItem('VCLASS_TOKEN');
};

// colorMode
export const getColorMode = (): string => {
  let colorMode = localStorage.getItem('VCLASS_COLOR_MODE');
  if (colorMode) {
    return colorMode;
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }
};

export const setColorMode = () => {
  let colorMode = getColorMode();

  if (colorMode === 'dark') {
    localStorage.setItem('VCLASS_COLOR_MODE', 'light');
  } else {
    localStorage.setItem('VCLASS_COLOR_MODE', 'dark');
  }
};

export const removeColorMode = () => {
  localStorage.removeItem('VCLASS_COLOR_MODE');
};
