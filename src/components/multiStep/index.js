import React from 'react';
import MultiStepNav from './multiStepNav';

/**
 *
 * Accepts any number of children with any context and accessibility
 * to store and utilities
 *
 * Each child except the last one, should accept a functional property
 * named cb, and call it with an object containing all the properties required
 * for the next step
 *
 * Every next child may expect all properties passed from previous step
 * in addition to the hard coded properties
 *
 * Last child may won't receive a cb function from MultiStep
 *
 * @param {Boolean} showNav - defines the visibility of navigation, defaults to true
 *
 *
 */
class MultiStep extends React.Component {
  constructor() {
    super();

    this.state = {
      step: {
        nextStep: (data) => {
          this.next.call(this, data);
        },
        prevStep: (data) => {
          this.prev.call(this, data);
        },
        data: [{}],
        current: 0,
      },
    };
  }

  next(data) {
    const newState = Object.assign({}, this.state);
    newState.step.current++;
    newState.step.data[newState.step.current] = data;
    this.setState(newState);
  }

  /**
   *
   * @param {Object} config
   * @param {Number} config.jump - The number of steps to jump back
   * @param {Boolean} config.reset - Should return to first step,
   *    this overrides all other configurations
   * @param {Number} config.to - The index of the step to go to
   * @memberOf MultiStep
   *
   */
  prev(config) {
    const getTarget = (current) => {
      if (current === 0) return current;
      else if (!config) return current - 1;
      else if (config.reset) return 0;
      else if (config.jump <= current) return current - Math.abs(Math.floor(config.jump));
      else if (config.to <= current) return Math.abs(Math.floor(config.to));
      return current;
    };

    const newState = Object.assign({}, this.state);
    newState.step.current = getTarget(this.state.step.current);

    this.setState(newState);
  }


  render() {
    const { children, className, finalCallback,
      browsable, backButtonLabel, prevPage } = this.props;
    const { step } = this.state;
    const extraProps = {
      nextStep: step.nextStep,
      prevStep: step.prevStep,
      ...step.data[step.current],
    };

    if (step.current === (children.length - 1) && typeof finalCallback === 'function') {
      extraProps.finalCallback = finalCallback;
    } else {
      extraProps.prevState = Object.assign({}, step.data[step.current + 1]);
    }

    return (<section className={className}>
      <MultiStepNav steps={children} showNav={this.props.showNav}
        prevPage={prevPage}
        browsable={browsable} backButtonLabel={backButtonLabel}
        current={step.current} prevStep={step.prevStep} />
      {
        React.cloneElement(children[step.current], extraProps)
      }
    </section>);
  }
}

export default MultiStep;