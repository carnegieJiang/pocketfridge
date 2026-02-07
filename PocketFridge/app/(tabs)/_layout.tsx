// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

import HomeActive from '../../assets/icons/home-selected.svg';
import HomeInactive from '../../assets/icons/home.svg';

import CameraActive from '../../assets/icons/camera-selected.svg';
import CameraInactive from '../../assets/icons/camera.svg';

import RecipeActive from '../../assets/icons/recipe-selected.svg';
import RecipeInactive from '../../assets/icons/recipe.svg';

import ProfileActive from '../../assets/icons/profile-selected.svg';
import ProfileInactive from '../../assets/icons/profile.svg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#B2D459',
          height: 100,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 20,
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          paddingTop: 20,
          paddingBottom: 4,
        },

        tabBarLabelStyle: {
          fontFamily: 'Helvetica-Light',
          fontSize: 12,
          marginTop: 4,
        },

        tabBarActiveTintColor: '#285B23',
        tabBarInactiveTintColor: '#6F8F52',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Fridge',
          tabBarIcon: ({ focused }) =>
            focused ? <HomeActive width={26} height={26} /> : <HomeInactive width={26} height={26} />,
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) =>
            focused ? <CameraActive width={26} height={26} /> : <CameraInactive width={26} height={26} />,
        }}
      />

      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ focused }) =>
            focused ? <RecipeActive width={26} height={26} /> : <RecipeInactive width={26} height={26} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileActive width={26} height={26} /> : <ProfileInactive width={26} height={26} />,
        }}
      />
    </Tabs>
  );
}