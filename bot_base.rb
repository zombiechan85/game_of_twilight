# -*- coding: utf-8 -*-
path='/home/zombiechan/proj/game/game_of_twilight'
Dir.chdir(path)
comment="ume > 特定のキーワードにマッチした発言があったらそれをIssueにしてくれる。"
time = Time.now.strftime("%Y-%m-%d %H:%M:%S")
title = "#{time} botからの投稿"
if comment.match(/^ume/)
  body = comment.match(/(?<=\>)(.*)/)
end
system("git issue add --title=\'[from bot] #{title}\' --body=\'#{body}\'")
