<script>
  export let data;
  const { summaries } = data;

  import Chart from 'chart.js/auto';
  import { Colors } from 'chart.js';
  import { onMount } from 'svelte';

  Chart.register(Colors);
	let dateString;
	
  let portfolio;
  let totalEarning;
  let totalExpense;

  const chartData = {
    labels: summaries['available_categories'],
    datasets: [
      {
          label: 'Earning',
          data: summaries['earnings'],
          hoverOffset: 10,
          borderWidth: 0
      },
      {
          label: 'Expense',
          data: summaries['expenses'],
          borderWidth: 0,
          hoverOffset: 10,
      }
    ]
  };
  const config = {
      type: 'pie',
      data: chartData,
      options: {
          borderRadius: '10',
          responsive: true,
          maintainAspectRatio: false,
          spacing: 0,
          plugins: {
            legend: {
              position: 'bottom',
              display: true,
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Portfolio'
            }
          }
      }
  };
  $: date = new Date();
  $: dateString = date.toJSON().slice(0,10);

  onMount(()=> {
      totalEarning = summaries['total_earning'].toLocaleString();
      totalExpense = '(' + summaries['total_expense'].toLocaleString() + ')';

      const ctx = portfolio.getContext('2d');
      var myChart = new Chart(ctx, config);
  });
</script>

<svelte:head>
    <title>Tabunganku</title> 
</svelte:head>

<style src="./main.scss"></style>

<main class="admin__main">
    <div class="dashboard">
        <div class="dashboard__item">
            <div class="card bigvalue">
                <strong class=" bigvalue__earning" title="Earning">{totalEarning}</strong>
            </div>
        </div>
        <div class="dashboard__item">
            <div class="card bigvalue">
                <a href="#!" id="prev_date_nav" title="Previous Date">&#8249;</a>
                <strong>{dateString}</strong>
                <a href="#!" id="next_date_nav" title="Next Date">&#8250;</a>
            </div>
        </div>
        <div class="dashboard__item">
            <div class="card bigvalue">
                <strong class="bigvalue__expense" title="Expense">{totalExpense}</strong>
            </div>
        </div>
        <div class="dashboard__item dashboard__item--full">
            <div class="card">
                <div class="chart">
                    <canvas bind:this={portfolio} width={500} height={300} >
                        Your browser does not support the canvas element.
                    </canvas>
                </div>
            </div>
        </div>
        <div class="dashboard__item dashboard__item--col">
            <div class="card">
                {#if summaries['transactions'].length > 0}
                <div class="dashboard__table">
                    <table>
                        <caption>Transaction</caption>
                        <thead>
                            <tr>
                                <th class="table__default">Category</th>
                                <th class="table__number">Amount</th>
                                <th class="table__default">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each summaries['transactions'] as transaction}
                                <tr>
                                    <td>{transaction['category_name']}</td>
                                    <td>
                                        {#if transaction['category_type'] === 'EARNING'}
                                            <span class="transaction__amount transaction__amount__positive">
                                                {transaction.amount.toLocaleString()}
                                            </span>
                                        {:else}
                                            <span class="transaction__amount transaction__amount__negative">
                                                {transaction.amount.toLocaleString()}
                                            </span>
                                        {/if}
                                    </td>
                                    <td>
                                        <div class="content">
                                            {#if transaction['note'] != null}
                                                {transaction['note']}
                                            {/if}
                                        </div>
                                    </td>
                                </tr>
                            {/each}    
                        </tbody>
                    </table>
                </div>
                {/if}
            </div>
        </div>
    </div>
</main>