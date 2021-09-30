import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./main.css";
console.log("styles: ", styles);

/**
 * 简易的竖向滚动组件，用于解决滚动条占位置的问题。
 * 实现原理是在里面包一层div，利用MutationObserver监听div的subtree和childList的变化，动态设置里层div的宽度。
 * @param {*} props
 * @return {*}
 */
const ScrollYDiv = (props) => {
  const { className, children } = props;
  const scrollContainerRef = useRef();
  const [innerContentWidth, setInnerContentWidth] = useState(0);

  useEffect(() => {
    setInnerContentWidth(scrollContainerRef?.current?.clientWidth || 0);

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const target = mutation.target;
        if (!target) {
          return;
        }
        setInnerContentWidth(scrollContainerRef.current.clientWidth);
      });
    });
    observer.observe(scrollContainerRef.current, {
      subtree: true,
      childList: true,
    });
  }, []);

  return (
    <div
      className={[styles["scroll-container"], className].join(" ")}
      ref={scrollContainerRef}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          width: innerContentWidth,
        });
      })}
    </div>
  );
};

ScrollYDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ScrollYDiv.defaultProps = {};

ScrollYDiv.displayName = "ScrollYDiv";

export default ScrollYDiv;
