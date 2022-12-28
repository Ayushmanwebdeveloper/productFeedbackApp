const size = {
    mobile: '600px',
    tablet: '880px',
    laptop: '1080px',
    desktop: '1400px',
  };
  
  export const device = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(min-width: ${size.desktop})`,
  };
  
  export default device;