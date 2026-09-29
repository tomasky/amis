import React from 'react';
import {ClassNamesFn, resizeSensor} from 'amis-core';

interface HorizontalScrollControlsProps {
  classnames: ClassNamesFn;
  scrollRef: React.RefObject<HTMLDivElement>;
}

interface HorizontalScrollControlsState {
  visible: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export default class HorizontalScrollControls extends React.Component<
  HorizontalScrollControlsProps,
  HorizontalScrollControlsState
> {
  state: HorizontalScrollControlsState = {
    visible: false,
    canScrollLeft: false,
    canScrollRight: false
  };

  scrollElement: HTMLDivElement | null = null;
  disposeResize?: () => void;
  disposeContentResize?: () => void;
  attachFrame?: number;
  frame?: number;

  componentDidMount() {
    window.addEventListener('resize', this.scheduleUpdate);
    this.attachFrame = requestAnimationFrame(() => {
      this.attachFrame = undefined;
      this.attachScrollElement();
    });
  }

  componentDidUpdate(prevProps: HorizontalScrollControlsProps) {
    if (this.scrollElement !== this.props.scrollRef.current) {
      this.attachScrollElement();
    } else if (prevProps !== this.props) {
      this.scheduleUpdate();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.scheduleUpdate);
    this.detachScrollElement();
    if (this.attachFrame !== undefined) {
      cancelAnimationFrame(this.attachFrame);
    }
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }

  detachScrollElement() {
    this.scrollElement?.removeEventListener('scroll', this.scheduleUpdate);
    this.disposeResize?.();
    this.disposeContentResize?.();
    this.disposeResize = undefined;
    this.disposeContentResize = undefined;
    this.scrollElement = null;
  }

  attachScrollElement() {
    this.detachScrollElement();
    const element = this.props.scrollRef.current;
    if (!element) {
      throw new Error('Table horizontal scroll container is missing');
    }
    const table = element.querySelector('table');
    if (!table) {
      throw new Error('Table horizontal scroll content is missing');
    }
    this.scrollElement = element;
    element.addEventListener('scroll', this.scheduleUpdate, {passive: true});
    this.disposeResize = resizeSensor(element, this.scheduleUpdate, false, 'width');
    this.disposeContentResize = resizeSensor(table, this.scheduleUpdate, false, 'width');
    this.scheduleUpdate();
  }

  scheduleUpdate = () => {
    if (this.frame !== undefined) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = undefined;
      const element = this.scrollElement;
      if (!element) {
        return;
      }
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      const visible = window.innerWidth <= 767 && maxScrollLeft > 2;
      const canScrollLeft = visible && element.scrollLeft > 2;
      const canScrollRight = visible && element.scrollLeft < maxScrollLeft - 2;
      this.setState(state =>
        state.visible === visible &&
        state.canScrollLeft === canScrollLeft &&
        state.canScrollRight === canScrollRight
          ? null
          : {visible, canScrollLeft, canScrollRight}
      );
    });
  };

  scroll = (direction: number) => {
    const element = this.scrollElement;
    if (!element) {
      throw new Error('Table horizontal scroll container is missing');
    }
    element.scrollBy({
      left: direction * Math.max(160, element.clientWidth * 0.8),
      behavior: 'smooth'
    });
  };

  render() {
    if (!this.state.visible) {
      return null;
    }

    const cx = this.props.classnames;
    return (
      <div className={cx('Table-horizontalScrollControls')}>
        <button
          type="button"
          className={cx('Table-horizontalScrollButton')}
          aria-label="Scroll table left"
          disabled={!this.state.canScrollLeft}
          onClick={() => this.scroll(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className={cx('Table-horizontalScrollButton')}
          aria-label="Scroll table right"
          disabled={!this.state.canScrollRight}
          onClick={() => this.scroll(1)}
        >
          →
        </button>
      </div>
    );
  }
}
