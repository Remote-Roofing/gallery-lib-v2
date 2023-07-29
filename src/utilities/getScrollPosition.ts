export const getScrollPosition = () => {
    if (typeof window === 'undefined') {
      // Not running on the client-side, return 0
      return 0;
    }
  
    // Return the current vertical scroll position
    return window.pageYOffset || document.documentElement.scrollTop;
}
