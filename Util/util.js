export function extractJoinedProps(object, ...paths) {
    if (paths.some(p => extract(object, p))) {
        return paths
            .map(p => extract(object, p))
            .filter(e => e)
            .join(' ');
    } else {
        return null;
    }
}

export function extract(data, path) {
    if (!path || !data) return null;
    if (typeof path === 'string') {
        path = path.split('.');
    }
    if (path.length > 1) {
        return extract(data[path[0]], path.slice(1));
    }
    if (path.length === 1) {
        let result = data[path[0]];
        switch (typeof result) {
            case 'string':
                if (result.trim().length !== 0) {
                    return result;
                } else {
                    return null;
                }
            case 'undefined':
                return null;
            default:
                return result;
        }
    }
}

export function createUriPath() {
    const args = Array.prototype.slice.call(arguments);
    return '/' + args.map(encodeURIComponent).join('/');
}
