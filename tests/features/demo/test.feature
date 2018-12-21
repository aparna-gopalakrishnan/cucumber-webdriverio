Feature: Demo test feature
  As a cucumber-wdio user, I want to be able to check
  whether I am able to execute a sample cucumber scenario

#  Scenario: Demo
#    Given I launch url


    Scenario Outline: Test to showcase accessibility testing using axe-webdriverIO
      When I validate accessibility standard A and AA using AXE for <page>
      Examples:
      |page|
      |https://github.com/|