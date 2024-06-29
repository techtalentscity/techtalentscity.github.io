const startLogoutTimer = (logoutCallback, inactivityDuration) => {
    let timeout;
  
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logoutCallback, inactivityDuration);
    };
  
    const handleUserActivity = () => {
      resetTimer();
    };
  
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
  
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  };
  
  export default startLogoutTimer;
  