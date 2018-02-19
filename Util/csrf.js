export function addCsrfToken(headers) {
    const headerName = document.querySelector('meta[name="_csrf_header_name"]').getAttribute('content');
    const token = document.querySelector('meta[name="_csrf_token"]').getAttribute('content');
    headers.append(headerName, token);
}
