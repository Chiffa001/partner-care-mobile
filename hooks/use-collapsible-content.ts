import { useCallback, useState } from 'react';

type UseCollapsibleContentOptions = {
  enabled: boolean;
};

export const useCollapsibleContent = ({ enabled }: UseCollapsibleContentOptions) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    if (!enabled) {
      return;
    }

    setIsCollapsed((previous) => !previous);
  }, [enabled]);

  return {
    isCollapsed,
    toggleCollapsed,
  };
};
