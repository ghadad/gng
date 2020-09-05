<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}" class="pa-0 ma-0">
    <left-panel
      v-if="isAuthenticated"
      :drawer="panelLeft"
      :rooms="rooms"
      :tree="tree"
      :peers="peers"
      :user="user"
      :conference-session="conferenceSession"
      :conference-room="conferenceRoom"
      :room-route="roomRoute"
    />
    <right-panel
      v-if="room && room._id"
      :drawer="panelRight"
      :room="room"
      :peers="peers"
    />
    <v-app-bar
      app
      clipped-left
      clipped-right
      :color="$vuetify.theme.themes[theme].primary"
      dense
      :dark="!isDark"
      :light="isDark"
    >
      <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="toggle('left')" />
      <logo />
      <v-toolbar-title class="mr-12 align-center">
        <v-btn
          small
          to="/"
          text
          tile
          depressed
          class="pa-0"
        >
          <span class="title">{{ title }}</span>
        </v-btn>
      </v-toolbar-title>
      <div class="flex-grow-1" />

      <auth-panel />
    </v-app-bar>

    <v-main class="pt-9 ma-0">
      <toaster />

      <v-container
        :fill-height="fillHeight"
        :class="areRoomRoutes ? 'pa-0 ma-0' : 'pl-0 pr-0 pt-0 pb-16 ma-0'"
        fluid
      >
        <v-row
          v-show="room"
          justify="center"
          align="stretch"
          align-content="start"
        >
          <v-col class="pb-0">
            <room-panel
              :rooms="rooms"
              :room="room"
              :peers="peers"
              :user="user"
              :room-route="roomRoute"
              :room-query="roomQuery"
              :conference-session="conferenceSession"
              :conference-room="conferenceRoom"
              :invites="invites"
            />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="stretch"
          align-content="start"
        >
          <v-col class="pb-0">
            <nuxt />
          </v-col>
        </v-row>
        <bottom-panel />
      </v-container>
    </v-main>
  </v-app>
</template>

