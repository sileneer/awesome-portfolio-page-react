import { MorphIcon } from 'morphicons/react';
import PropTypes from 'prop-types';

// Project-wide icon renderer. All icons go through morphicons (see AGENT.md):
// `icon` is icon *data* imported from the `lucide` package — NOT lucide-react
// components — so any two icons can spring-morph when the `icon` prop changes
// (e.g. the nav theme toggle: sun → moon → sun-moon).
// - `size` is px (MUI's `fontSize="small"` equivalent is 20).
// - Colour always inherits via currentColor — set `color`/`sx` on the parent.
// - Decorative by default (aria-hidden); pass `label` for a meaningful icon.
const AppIcon = ({ icon, size = 24, strokeWidth = 2, ...rest }) => (
  <MorphIcon icon={icon} size={size} strokeWidth={strokeWidth} reducedMotion="user" {...rest} />
);

AppIcon.propTypes = {
  // Lucide IconNode data (structurally an array of [tag, attrs] tuples).
  icon: PropTypes.any.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default AppIcon;
