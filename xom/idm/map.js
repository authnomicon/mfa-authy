exports = module.exports = function(container) {
  return container.create('./map/authyid');
};

exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
