import React, { forwardRef, RefObject } from 'react';
import styles from './index.scss';

interface IProps {
  title?: string
  appRef?: any
}

const About = (props: IProps): React.ReactElement => (
  <div className={styles.wrapper} ref={props.appRef}>About 123, { props.title || '' }</div>
);

export default forwardRef((props: IProps, ref) => {
  return <About { ...props } appRef={ref}></About>
})
