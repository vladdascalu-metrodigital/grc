/**
 * offsetFromPreviousSiblings
 *
 * traverses previous siblings to sum up heights for sticky offset.
 * previous sibling nodes must have a sticky namespace set in a data-sticky attribute!
 *
 * example:
 *
 * <element>                        ignored
 * <element data-sticky="tock">     ignored
 * <element data-sticky="stick">    counted
 * <element data-sticky="stick">    initial node, counted
 *
 * @param {*} node  html node
 * @param {*} top   additional offset in px
 */
export function stickyOffsetFromPreviousSiblings(node, stickyNamespace, top = 0) {
    let prevSibling = node.previousSibling;
    if (prevSibling && prevSibling.dataset.sticky === stickyNamespace) {
        let prevSiblingOffset = top + prevSibling.clientHeight;
        return stickyOffsetFromPreviousSiblings(prevSibling, stickyNamespace, prevSiblingOffset);
    } else {
        return top;
    }
}

/**
 * stickyOffsetFromSelector
 *
 * calculate sum of heights from all matching nodes for a sticky offset
 *
 * @param {*} selector  css selector
 * @param {*} add       additional offset in px
 */
export function stickyOffsetFromSelector(selector, add = 0) {
    let offset = 0;
    if (typeof selector === 'string' && document.querySelector(selector)) {
        offset = Array.from(document.querySelectorAll(selector)).reduce((height, el) => (height += el.clientHeight), 0);
    }
    return offset + add;
}

/**
 * stickyOffsetFromCombined
 *
 * calculate offset px for sticky behaviour.
 * combine offsetFromPreviousSiblings and stickyOffsetFromSelector.
 *
 * When stickyNamespace is used, previous sibling nodes must have namespace set in data-sticky attribute.
 * See offsetFromPreviousSiblings for more details.
 *
 * conveniently use callback to handle calculated offset immediately after calculation.
 *
 * @param {{node, stickyNamespace, offsetSelector, offsetPx, callback}} paramas
 */
export function stickyOffsetFromCombined({ node, stickyNamespace, offsetSelector, offsetPx, callback }) {
    let stickyTopOffset = 0;
    if (typeof offsetPx === 'number') {
        stickyTopOffset += offsetPx;
    }
    if (typeof offsetSelector === 'string' && document.querySelector(offsetSelector)) {
        stickyTopOffset += stickyOffsetFromSelector(offsetSelector);
    }
    if (node instanceof HTMLElement) {
        stickyTopOffset += stickyOffsetFromPreviousSiblings(node, stickyNamespace);
    }
    if (callback) callback(stickyTopOffset);
    return stickyTopOffset;
}
