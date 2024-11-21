
export default (string: any) => {
	if (string) {
	  if (typeof string === "string") {
		return string.trim().length === 0;
	  } else {
		return true;
	  }
	}
  
	return true;
}