from slacker import Slacker

slack = Slacker('<your-slack-api-token-goes-here>')

# Send a message to #general channel
slack.chat.post_message('#test', 'Hello fellow slackers!', as_user=True)

# Get users list
response = slack.users.list()
users = response.body['members']

# Upload a file
# slack.files.upload('hello.txt')
