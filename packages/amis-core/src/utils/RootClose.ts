/**
 * 兼容之前的 RootCloseWrapper 写法
 */

import React, {useState} from 'react';
import useRootClose from 'react-overlays/useRootClose';
import {findDOMNode} from 'react-dom';

export const RootClose = ({children, onRootClose, ...props}: any) => {
  const [rootComponent, attachRef] = useState(null);
  const rootElement = findDOMNode(rootComponent) as Element;
  const onClose = React.useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      const belongedModal = target.closest('[role=dialog]');
      if (
        !target.isConnected ||
        (rootElement && belongedModal && !belongedModal.contains(rootElement))
      ) {
        return;
      }
      onRootClose?.(e);
    },
    [rootComponent, onRootClose]
  );

  useRootClose(rootElement, onClose, props);

  return typeof children === 'function' ? children(attachRef) : children;
};
