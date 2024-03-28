export const slideDownVariants = {
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  inactive: {
    opacity: 0,
    y: -40,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideUpVariants = {
  ...slideDownVariants,
  inactive: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
};

export const baseMotionProps = {
  variants: slideDownVariants,
  initial: 'inactive',
  animate: 'active',
  exit: 'inactive',
};
