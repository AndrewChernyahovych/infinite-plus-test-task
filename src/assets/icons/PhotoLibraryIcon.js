import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PhotoLibraryIcon({width = 30, height = 30, color = '#212121'}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M22.993 6.008A3.243 3.243 0 0124.5 8.75v10.5c0 2.9-2.35 5.25-5.25 5.25H8.75a3.248 3.248 0 01-2.744-1.507l.122.005.122.002h13A3.75 3.75 0 0023 19.25v-13c0-.081-.002-.162-.007-.242zm-10.061 8.14l.093.078 7.428 7.293A3.235 3.235 0 0118.75 22H6.25a3.235 3.235 0 01-1.703-.481l7.427-7.293.084-.07a.75.75 0 01.772-.068l.102.06zM18.75 3A3.25 3.25 0 0122 6.25v12.5c0 .627-.178 1.213-.485 1.71l-7.439-7.304-.128-.117a2.25 2.25 0 00-2.889-.006l-.135.123-7.439 7.303A3.235 3.235 0 013 18.75V6.25A3.25 3.25 0 016.25 3h12.5zM16.5 7.25a1.25 1.25 0 100 2.499 1.25 1.25 0 000-2.499z"
        fill={color}
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
}

export default PhotoLibraryIcon;
