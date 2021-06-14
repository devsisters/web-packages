#!/bin/bash

set -eux

SUBSET_LATIN='U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
SUBSET_LATIN_EXT='U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF'
SUBSET_THAI='U+0E01-0E5B, U+200C-200D, U+25CC'

OPTS_SUBSET_EN="--unicodes=${SUBSET_LATIN}, ${SUBSET_LATIN_EXT}"
OPTS_SUBSET_TH="--unicodes=${SUBSET_LATIN}, ${SUBSET_LATIN_EXT}, ${SUBSET_THAI}"
OPTS_SUBSET_KO="--text-file=scripts/glyphs-ko.txt"

function build() {
  local font_name="$1";
  local opts="$2";

  # See https://www.44bits.io/ko/post/optimization_webfont_with_pyftsubnet

  # OTP
  pyftsubset "${font_name}.ttf" \
    --output-file="${font_name}.subset.otf" \
    --layout-features="*" \
    --glyph-names \
    --symbol-cmap \
    --legacy-cmap \
    --notdef-glyph \
    --notdef-outline \
    --recommended-glyphs \
    --name-legacy \
    --drop-tables= \
    --name-IDs="*" \
    --name-languages="*" \
    "$opts"

  # WOFF
  pyftsubset "${font_name}.ttf" \
    --flavor="woff" \
    --output-file="${font_name}.subset.woff" \
    --with-zopfli \
    --layout-features="*" \
    --glyph-names \
    --symbol-cmap \
    --legacy-cmap \
    --notdef-glyph \
    --notdef-outline \
    --recommended-glyphs \
    --name-legacy \
    --drop-tables= \
    --name-IDs="*" \
    --name-languages="*" \
    "$opts"

  # WOFF2
  pyftsubset "${font_name}.ttf" \
    --flavor="woff2" \
    --output-file="${font_name}.subset.woff2" \
    --layout-features="*" \
    --glyph-names \
    --symbol-cmap \
    --legacy-cmap \
    --notdef-glyph \
    --notdef-outline \
    --recommended-glyphs \
    --name-legacy \
    --drop-tables= \
    --name-IDs="*" \
    --name-languages="*" \
    "$opts"
}
pwd

# Noto Sans (latin-only)
build "src/components/en/NotoSans/NotoSans-Regular" "$OPTS_SUBSET_EN"
build "src/components/en/NotoSans/NotoSans-Italic" "$OPTS_SUBSET_EN"
build "src/components/en/NotoSans/NotoSans-Bold" "$OPTS_SUBSET_EN"
build "src/components/en/NotoSans/NotoSans-BoldItalic" "$OPTS_SUBSET_EN"

# 태국어 폰트
build "src/components/th/NotoSansThai/NotoSansThai-Regular" "$OPTS_SUBSET_TH"
build "src/components/th/NotoSansThai/NotoSansThai-Bold" "$OPTS_SUBSET_TH"

# 쿠키런 폰트 (한국어, 영어)
build "src/components/ko/CookieRun/CookieRun-Regular" "$OPTS_SUBSET_KO"
build "src/components/ko/CookieRun/CookieRun-Bold" "$OPTS_SUBSET_KO"

# Cafe24 단정해 폰트 (한국어, 영어)
build "src/components/ko/Cafe24Danjunghae/Cafe24Danjunghae" "$OPTS_SUBSET_KO"
