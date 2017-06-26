expect.extend({

  /**
    Passes if the node, or any child (recursively), is a scrollView containing a
    `sections` array.
    @param node - a return value from `renderer.create`;
        see [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)
  */
  toContainSectionList(receivedTree) {
    let pass = checkForSections(receivedTree.toJSON(), false)
    if (pass) {
      message = `expected ${receivedTree} not to contain a sectionList`
    } else {
      message = `expected ${receivedTree} to contain a sectionList`
    }
    return {actual: receivedTree.toJSON(), message: message, pass: pass}
  },

  /**
    Passes if the node, or any child (recursively), is a scrollView containing a non-empty
    `sections` array.
    @param node - a return value from `renderer.create`;
        see [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)
  */
  toContainSectionListWithData(receivedTree) {
    let pass = checkForSections(receivedTree.toJSON(), true)
    if (pass) {
      message = `expected ${receivedTree} not to contain a sectionList with data`
    } else {
      message = `expected ${receivedTree} to contain a sectionList with data`
    }

    return {actual: receivedTree.toJSON(), message: message, pass: pass}

  }
})


// Recursively check the given node tree for a SectionList.
// @param node - a render tree from react-test-renderer
// @param expectNonEmpty - if true, then the section
// @return true if a SectionList is present, and (if expectNonEmpty is true) if it contains at least one object
function checkForSections (node, expectNonEmpty, _shouldPass) {
  if (node.type === 'RCTScrollView' && 
      (!expectNonEmpty || (node.props.sections && node.props.sections.length))) {
    return true
  }
  if (node.children) {
    node.children.forEach(c => {
      _shouldPass = checkForSections(c, expectNonEmpty, _shouldPass)
    })
  }
  return _shouldPass || false
}
