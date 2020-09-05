const S = require('fluent-schema')

const appSettings = S.object()
  .prop('name', S.string())
  .prop('env', S.object()
    .prop('NODE_ENV', S.string())
    .prop('HOST', S.string())
    .prop('PORT', S.string())
    .prop('PORT_API', S.string())
    .prop('URL', S.string())
    .prop('API_URL', S.string())
  )

const iceServers = S.object()
  .prop('urls', S.string())
  .prop('username', S.string())
  .prop('credential', S.string())

const janusSettings = S.object()
  .prop('url', S.string())
  .prop('iceServers', S.array().items(iceServers))
  .prop('plugins', S.object()
    .prop('videoroom', S.string())
    .prop('textroom', S.string())
    .prop('streaming', S.string())
  )
  .prop('audioCodecs', S.array().items(S.string()))
  .prop('videoCodecs', S.array().items(S.string()))

const authSettings = S.object()
  .prop('codeValidityInMinutes', S.number())
  .prop('userActivationPage', S.string())
  .prop('updatePasswordPage', S.string())
  .prop('updateUsernamePage', S.string())
  .prop('inviteAcceptPage', S.string())
  .prop('inviteRejectPage', S.string())

const oauthSettings = S.object()
  .prop('types', S.array().items(S.string()))

const dbSettings = S.object()
  .prop('dbUrl', S.string())
  .prop('dbOptions', S.object()
    .prop('family', S.integer())
    .prop('useNewUrlParser', S.boolean())
    .prop('useCreateIndex', S.boolean())
    .prop('useFindAndModify', S.boolean())
    .prop('useUnifiedTopology', S.boolean())
    .prop('keepAlive', S.boolean())
    .prop('keepAliveInitialDelay', S.boolean())
  )

const dataSettings = S.object()
  .prop('room', S.object()
    .prop('defaults', S.object()
      .prop('is_open', S.boolean())
      .prop('media', S.object()
        .prop('publishers', S.integer())
        .prop('is_private', S.boolean())
        .prop('bitrate', S.number())
        .prop('fir_freq', S.number())
        .prop('audiocodec', S.string())
        .prop('videocodec', S.string())
        .prop('record', S.boolean())
        .prop('notify_joining', S.boolean())
      )
    )
  )
  .prop('code', S.object()
    .prop('types', S.array().items(S.string()))
  )
  .prop('invite', S.object()
    .prop('statuses', S.array().items(S.string()))
    .prop('types', S.array().items(S.string()))
    .prop('defaults', S.object()
      .prop('type', S.string())
      .prop('status', S.string())
    )
  )
  .prop('message', S.object()
    .prop('types', S.array().items(S.string()))
    .prop('defaults', S.object()
      .prop('type', S.string())
    )
  )

const wsSettings = S.object()
  .prop('opTypes', S.object()
    .prop('messageCreate', S.string())
    .prop('messageUpdate', S.string())
    .prop('messageDelete', S.string())

    .prop('messageReactionPush', S.string())
    .prop('messageReactionPull', S.string())

    .prop('connectionOpen', S.string())
    .prop('connectionUpdate', S.string())
    .prop('connectionClose', S.string())

    .prop('visitOpen', S.string())
    .prop('visitClose', S.string())

    .prop('roomCreate', S.string())
    .prop('roomUpdate', S.string())
    .prop('roomDelete', S.string())

    .prop('roomInviteAccept', S.string())
    .prop('roomInviteReject', S.string())
    .prop('roomInviteUpdate', S.string())
    .prop('roomInviteDelete', S.string())

    .prop('roomPeerRoleUpdate', S.string())
    .prop('roomPeerAdd', S.string())
    .prop('roomPeerRemove', S.string())
    .prop('roomPeerJoin', S.string())
    .prop('roomPeerLeave', S.string())
    .prop('roomCallOpen', S.string())
    .prop('roomCallClose', S.string())
  )

const emailSettings = S.object()
  .prop('fromEmail', S.string())
  .prop('supportEmail', S.string())
  .prop('sendgrid', S.object()
    .prop('apiKey', S.string())
  )
  .prop('gmail', S.object()
    .prop('service', S.string())
    .prop('auth', S.object()
      .prop('user', S.string())
      .prop('pass', S.string())
    )
  )
  .prop('smtp', S.object()
    .prop('host', S.string())
    .prop('port', S.string())
    .prop('secure', S.string())
    .prop('auth', S.object()
      .prop('user', S.string())
      .prop('pass', S.string())
    )
  )
const webPushSettings = S.object()
  .prop('publicKey', S.string())

const response = S.object()
  .prop('appSettings', appSettings)
  .prop('janusSettings', janusSettings)
  .prop('authSettings', authSettings)
  .prop('oauthSettings', oauthSettings)
  .prop('dbSettings', dbSettings)
  .prop('dataSettings', dataSettings)
  .prop('wsSettings', wsSettings)
  .prop('emailSettings', emailSettings)
  .prop('webPushSettings', webPushSettings)

module.exports = {
  get: {
    response: {
      200: response
    }
  }
}