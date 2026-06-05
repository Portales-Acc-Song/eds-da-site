# Temas (multi-site / repoless)

Este repositorio de código es compartido por el site original y varios sites
*repoless*, que solo se diferencian en el contenido. Los temas permiten que cada
site (o grupo de sites) tenga su propia identidad reutilizando bloques, scripts
y estilos comunes.

## Cómo se elige el tema

El tema se selecciona con la **metadata `theme`** de cada site (p. ej. en
`metadata.xlsx`), no con código:

| metadata | efecto |
| --- | --- |
| `theme` | nombre del tema. Carga `styles/themes/<theme>.css` y añade la clase al `<body>`. Varios sites pueden compartir tema usando el mismo valor. |
| `favicon` | (opcional) URL/ruta del favicon del site. |

Si un site no define `theme`, usa el **tema por defecto**: los valores base de
`styles/styles.css` (`:root`), sin requests extra.

## Qué puede cambiar un tema

1. **Colores y fuentes** → crea `styles/themes/<theme>.css` y redefine solo las
   *custom properties*. La estructura/layout vive en `styles/styles.css` y es
   común a todos. Usa [`universidad.css`](universidad.css) como plantilla.
2. **Assets de marca** → el logo es por contenido (fragmento `/nav` del site).
   El favicon se controla con la metadata `favicon`.
3. **Comportamiento de bloques** → define flags por tema en `THEME_CONFIG` de
   [`scripts/theme.js`](../../scripts/theme.js) y consúltalos desde un bloque
   con `getThemeConfig()` / `isFeatureEnabled('miFlag')`.

## Añadir un tema nuevo

1. Copia `universidad.css` a `styles/themes/<nuevo-tema>.css` y ajusta los tokens.
2. (Opcional) Añade su configuración de comportamiento en `THEME_CONFIG`.
3. En el contenido del site, pon `theme: <nuevo-tema>` en la metadata.

No hace falta tocar `scripts.js` ni `aem.js`.