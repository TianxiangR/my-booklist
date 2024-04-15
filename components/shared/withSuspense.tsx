import React, { ComponentProps, ComponentType, PropsWithChildren, ReactNode, Suspense } from 'react';

/**
 * A higher-order component that wraps a given component with React Suspense.
 * @param WrappedComponent - The React component to wrap.
 * @param Fallback - The fallback component shown during the loading phase.
 * @returns A component wrapped in a Suspense component.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withSuspense<T extends object>(WrappedComponent: ComponentType<T>, Fallback: ReactNode = null) {
  return function SuspenseComponent(props: T): JSX.Element {
    return (
      <Suspense fallback={Fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export default withSuspense;