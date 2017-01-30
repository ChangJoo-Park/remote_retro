defmodule RetroIdeaRealtimeUpdateTest do
  use RemoteRetro.IntegrationCase, async: false

  # @tag :skip
  test "the immediate appearance of other users submitted' ideas" do
    {:ok, session_one} = Wallaby.start_session()
    {:ok, session_two} = Wallaby.start_session()

    session_one = join_retro_as_user(session_one, "McKenneth McTickles")
    session_two = join_retro_as_user(session_two, "Travis Vander Hoop")

    ideas_list_text = session_one |> find(".sad.ideas", visible: false) |> text
    refute String.contains?(ideas_list_text, "user stories lack clear business value")

    submit_idea(session_two, %{ category: "sad", body: "user stories lack clear business value" })

    ideas_list_text = session_one |> find(".sad.ideas") |> text
    assert String.contains?(ideas_list_text, "user stories lack clear business value")

    Wallaby.end_session(session_one)
    Wallaby.end_session(session_two)
  end
end
