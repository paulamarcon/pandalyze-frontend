export const blocksInfo = [
  {
    blockType: "head",
    blockTitle: "Bloque 'Head'",
    blockInfo:
      "Por defecto obtiene las primeras 5 filas del DataFrame y, sino, se puede indicar la cantidad deseada.",
  },
  {
    blockType: "info",
    blockTitle: "Bloque 'Info'",
    blockInfo:
      "Obtiene características del DataFrame, incluyendo las columnas, tipos de datos y memoria utilizada.",
  },
  {
    blockType: "describe",
    blockTitle: "Bloque 'Describe'",
    blockInfo:
      "Genera estadísticas de las columnas numéricas del DataFrame: promedio, valor máximo, mínimo, entre otros.",
  },
  {
    blockType: "dtypes",
    blockTitle: "Bloque 'Dtypes'",
    blockInfo: "Obtiene los tipos de datos de las columnas del DataFrame.",
  },
  {
    blockType: "column",
    blockTitle: "Bloque 'Columns'",
    blockInfo: "Obtiene los nombres de las columnas del DataFrame.",
  },
  {
    blockType: "shape",
    blockTitle: "Bloque 'Shape'",
    blockInfo: "Obtiene el número de filas y columnas del DataFrame.",
  },
  {
    blockType: "count",
    blockTitle: "Bloque 'Count'",
    blockInfo:
      "Obtiene la cantidad de valores no nulos que hay en cada columna del DataFrame.",
  },
  {
    blockType: "max",
    blockTitle: "Bloque 'Max'",
    blockInfo: "Obtiene el valor máximo de cada columna del DataFrame.",
  },
  {
    blockType: "min",
    blockTitle: "Bloque 'Min'",
    blockInfo: "Obtiene el valor mínimo de cada columna del DataFrame.",
  },
  {
    blockType: "mean",
    blockTitle: "Bloque 'Mean'",
    blockInfo:
      "Calcula el promedio de cada columna del DataFrame. Todas ellas deben ser numéricas para que funcione.",
  },
  {
    blockType: "unique",
    blockTitle: "Bloque 'Unique'",
    blockInfo:
      "Obtiene los valores únicos de una columna específica del DataFrame.",
  },
  {
    blockType: "nullSum",
    blockTitle: "Bloque 'IsNull + Sum'",
    blockInfo:
      "Obtiene la cantidad de valores nulos de cada columna del DataFrame.",
  },
  {
    blockType: "bar",
    blockTitle: "Bloque 'Bar'",
    blockInfo:
      "Genera un gráfico de barras a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "line",
    blockTitle: "Bloque 'Line'",
    blockInfo:
      "Genera un gráfico de líneas a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "pie",
    blockTitle: "Bloque 'Pie'",
    blockInfo:
      "Genera un gráfico de torta a partir de dos columnas del DataFrame. La de 'values' debe ser numérica.",
  },
  {
    blockType: "scatter",
    blockTitle: "Bloque 'Scatter'",
    blockInfo:
      "Genera un gráfico de puntos a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "show",
    blockTitle: "Bloque 'Show'",
    blockInfo: "Imprime en una pestaña nueva el gráfico generado.",
  },
  {
    blockType: "showInConsole",
    blockTitle: "Bloque 'Show'",
    blockInfo: "Imprime en consola el gráfico generado.",
  },
];
