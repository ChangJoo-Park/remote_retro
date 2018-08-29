import React from "react"
import includes from "lodash/includes"

import CategoryColumn from "./category_column"

import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_board.css"
import STAGES from "../configs/stages"

const { ACTION_ITEMS, CLOSED } = STAGES

const IdeaBoard = props => {
  const { stage, categories } = props
  const showActionItem = includes([ACTION_ITEMS, CLOSED], stage)
  const renderableColumnCategories = [...categories]
  if (showActionItem) { renderableColumnCategories.push("action-item") }

  const categoryColumns = renderableColumnCategories.map(category => (
    <CategoryColumn {...props} category={category} key={category} />
  ))

  return (
    <div>
      <div className="ui three item tabular menu">
        <div className="active item">
          <img src={`/images/happy.svg`} height={40} width={40} />
        </div>
        <div className="item">
          <img src={`/images/sad.svg`} height={40} width={40} />
        </div>
        <div className="item">
          <img src={`/images/confused.svg`} height={40} width={40} />
        </div>
      </div>
      <div className="ui bottom attached active tab segment">
        {categoryColumns}
      </div>
    </div>
  )
}

IdeaBoard.propTypes = {
  currentUser: AppPropTypes.presence.isRequired,
  ideas: AppPropTypes.ideas.isRequired,
  retroChannel: AppPropTypes.retroChannel.isRequired,
  stage: AppPropTypes.stage.isRequired,
  categories: AppPropTypes.categories.isRequired,
}

export default IdeaBoard
