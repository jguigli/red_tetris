import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'
import {Tetris, Board} from '../src/components/test'

chai.should()
chai.use(equalJSX)

describe('React component test', function(){
  it('works', function(){
    const renderer = createRenderer()
    renderer.render(React.createElement(Tetris))
    const output = renderer.getRenderOutput()
    output.should.equalJSX(<Board/>)
  })
}) 