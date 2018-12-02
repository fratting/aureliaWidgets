# Aurelia *Storage* Component

Use this component provides an interface to work with the browser's storage capabilities. This component has no view and is imported into your view model.  

This component is valuable to store information that doesn't change often and reduces the need to make http requests back to the server, which can reduce performance and user experience.  Lookup data is a good example, such as geographic hiearchies or user names, etc.

**Importing:**
	import {Storage} from 'rapiduiFramework/storage/storage';

**Api**  
* *store(key,value,expiration,session=true)* - Stores a value using the key provided with an expiration default of 14 days in either the browser's session storage or local storage. *Note: expiration has no affect if using session storage and the user's browser session has ended before expiration.  
   *  key - Any unique string value to identify what you are storing
   *  value - Any object; object will be JSON stringified when stored
   *  expiration - A value, in seconds, for how long the value exists for
   *  session - true/false value to denote if session or local storage should be used
*  *retrieve(key)* - Retrieves the value stored for the provided key if the value has not expired; otherwise, null is returned. You should code defensively for the possibility of a null value and retrieve fresh data if needed.
*  *remove(key)* - Removes a value from storage for the provided key


	
**Dependencies:**  
	This control uses moment.js to track expiration, moment.js should be installed via jspm if it is not already (jspm install moment)