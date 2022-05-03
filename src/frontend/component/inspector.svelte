<script lang="ts">
  import { CommandExecutor, CommandService } from 'engine/core/command';
  import type { CommandHint } from 'frontend/command-hint/command-hint';
  import { MovementCommandHintProvider } from 'frontend/command-hint/command-hint-providers/movement-command-hint-provider';
  import { CommandHintUtils } from 'frontend/command-hint/command-hint-utils';
  import { GameService } from 'frontend/game/game-service';
  import { engine, player, selectedField } from 'frontend/store';
  import AvatarWithName from './avatar-with-name.svelte';
  import CommandTile from './command-tile.svelte';

  const commandsHintsProviders = [new MovementCommandHintProvider()];

  $: commandsHints = CommandHintUtils.getCommandsHints(commandsHintsProviders, {
    engine: $engine,
    executor: $player.requireComponent(CommandExecutor),
    field: $selectedField
  }).filter((commandHint) => commandHint.field === $selectedField);

  function executeCommandHint(commandHint: CommandHint) {
    CommandService.scheduleCommand(commandHint.command, $player.requireComponent(CommandExecutor), $engine);
    GameService.processEvents($engine);
  }
</script>

{#if $selectedField}
  <AvatarWithName avatar={$selectedField.imageUrl} name={$selectedField.name} description={$selectedField.description} />
  {#each commandsHints as commandHint}
    <div class="mt-[5px]">
      <CommandTile name={commandHint.name} imageUrl={commandHint.imageUrl} on:click={() => executeCommandHint(commandHint)} />
    </div>
  {/each}
{/if}
