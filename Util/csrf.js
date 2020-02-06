export function addCsrfToken(headers) {
    const headerNameObj = document.querySelector('meta[name="_csrf_header_name"]');
    const tokenObj = document.querySelector('meta[name="_csrf_token"]');
    const headerName = headerNameObj ? headerNameObj.getAttribute('content') : "X-CSRF-TOKEN";
    const token = tokenObj ? tokenObj.getAttribute('content') : "fake token value";
    headers ? headers.append(headerName, token) : console.log("no headers configured!");
}
