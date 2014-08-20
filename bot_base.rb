# -*- coding: utf-8 -*-
path='your/repos'
Dir.chdir(path)
comment="you > 特定のキーワードにマッチした発言があったらそれをIssueにしてくれる。"
time = Time.now.strftime("%Y-%m-%d %H:%M:%S")
title = "#{time} botからの投稿"
if comment.match(/^you/)
  body = comment.match(/(?<=\>)(.*)/)
end
system("git issue add --title=\'[from bot] #{title}\' --body=\'#{body}\'")
