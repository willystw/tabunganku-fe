<script>
  export let data;
  let { summaries } = data;

  import Chart from 'chart.js/auto';
  // import { Colors } from 'chart.js';
  import { onMount } from 'svelte';

  // Chart.register(Colors);	
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
            colors: {
              forceOverride: true
            },
            title: {
              display: true,
              text: 'Portfolio'
            }
          }
      }
  };
  let time = new Date();
  $: dateString = time.toJSON().slice(0,10);

  async function fetchSummaries(dateData) {
    const reqBody = {
      date: dateData
    };

    const result = await fetch(`/api/transactions/summaries`, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })

    if(result.status === 200) {
      const data = await result.json();
      const response = {
        summaries: data.data
      };
      return response;
    } else {
      throw new Error(`Error status ${result.status} with message: ${result.statusText}`);
    }
  }

  async function handleDateChange() {
    let response = await fetchSummaries(time.toJSON().slice(0,10));
    summaries = response['summaries'];

    myChart.data.labels = summaries['available_categories'];
    myChart.data.datasets.forEach((dataset) => {
      if(dataset.label === "Earning") {
        dataset.data = summaries['earnings'];
      } else if (dataset.label === "Expense") {
        dataset.data = summaries['expenses'];
      }
    });
    //update chart
    myChart.update();
  }

  async function nextDate() {
    time = new Date(time.setDate(time.getDate()  + 1));
    handleDateChange();
  }

  async function prevDate() {
    time = new Date(time.setDate(time.getDate() - 1));
    handleDateChange();
  }

  let portfolio, myChart;
  $: totalEarning = summaries['total_earning'];
  $: totalExpense = summaries['total_expense'];

  onMount(()=> {
      const ctx = portfolio.getContext('2d');
      myChart = new Chart(ctx, config);
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
                <strong class=" bigvalue__earning" title="Earning">{totalEarning.toLocaleString()}</strong>
            </div>
        </div>
        <div class="dashboard__item">
            <div class="card bigvalue">
                <a href="#!" id="prev_date_nav" title="Previous Date" on:click={prevDate}>&#8249;</a>
                <strong>{dateString}</strong>
                <a href="#!" id="next_date_nav" title="Next Date" on:click={nextDate}>&#8250;</a>
            </div>
        </div>
        <div class="dashboard__item">
            <div class="card bigvalue">
                <strong class="bigvalue__expense" title="Expense">({totalExpense.toLocaleString()})</strong>
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